import { useState, useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { cloudinaryUrl, getFullName, getInitials } from "@/utils/utils";
import { Controller, useForm } from "react-hook-form";
import { profileFormSchema } from "@sphere/shared";
import type { User } from "@sphere/shared";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ─── AvatarUpload ────────────────────────────────────────────────────────────

interface AvatarUploadProps {
  preview: string | null;
  avatarSrc: string | undefined;
  fullName: string;
  initials: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

function AvatarUpload({
  preview,
  avatarSrc,
  fullName,
  initials,
  fileInputRef,
  onFileChange,
  onRemove,
}: AvatarUploadProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Change profile picture"
      >
        <Avatar className="size-20">
          <AvatarImage src={preview ?? avatarSrc} alt={fullName} />
          <AvatarFallback className="text-white font-bold text-xl font-display tracking-tight bg-[oklch(0.833_0.145_321.434)]">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 grid place-items-center">
          <Camera className="size-5 text-white" />
        </div>

        {/* Edit badge */}
        <span className="absolute -bottom-0.5 -right-0.5 size-6 rounded-full bg-primary grid place-items-center ring-2 ring-background group-hover:scale-110 transition-transform duration-150">
          <Camera className="size-3 text-white" />
        </span>
      </div>

      {preview && (
        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors duration-150"
        >
          <X className="size-3" />
          Remove photo
        </Button>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        aria-label="Upload profile picture"
        className="sr-only"
        tabIndex={-1}
        onChange={onFileChange}
      />
    </div>
  );
}

// ─── ProfileFormBody ─────────────────────────────────────────────────────────

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormBodyProps {
  form: ReturnType<typeof useForm<ProfileFormValues>>;
  user: User | null;
  preview: string | null;
  fullName: string;
  initials: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onSubmit: (data: ProfileFormValues) => void;
}

function ProfileFormBody({
  form,
  user,
  preview,
  fullName,
  initials,
  fileInputRef,
  onFileChange,
  onRemove,
  onSubmit,
}: ProfileFormBodyProps) {
  return (
    <form
      id="profile-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="px-5 py-6 grid gap-5"
    >
      <AvatarUpload
        preview={preview}
        avatarSrc={cloudinaryUrl(user?.avatar)}
        fullName={fullName}
        initials={initials}
        fileInputRef={fileInputRef}
        onFileChange={onFileChange}
        onRemove={onRemove}
      />

      <FieldGroup className="grid grid-cols-2 gap-3">
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder={user?.firstName || "First Name"}
                id="firstName"
                autoComplete="given-name"
                aria-invalid={fieldState.invalid}
                className="h-13 rounded-xl text-sm px-4"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder={user?.lastName || "Last Name"}
                id="lastName"
                autoComplete="family-name"
                aria-invalid={fieldState.invalid}
                className="h-13 rounded-xl text-sm px-4"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                id="bio"
                placeholder={user?.bio || "Write about yourself."}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                className="rounded-xl text-sm px-4 resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}

// ─── ProfileDialog ────────────────────────────────────────────────────────────

const ProfileDialog = ({ open, onOpenChange }: Props) => {
  const { user } = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const fullName = getFullName(user?.firstName, user?.lastName, user?.username);
  const initials = getInitials(fullName || user?.username);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      bio: user?.bio ?? "",
      avatar: user?.avatar ?? undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        bio: user?.bio ?? "",
        avatar: user?.avatar ?? undefined,
      });
      handleRemove();
    }
    onOpenChange(value);
  };

  function onSubmit(data: ProfileFormValues) {
    updateProfile(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        avatarFile: selectedFile,
      },
      { onSuccess: () => handleOpenChange(false) },
    );
  }

  const sharedFormProps = {
    form,
    user,
    preview,
    fullName,
    initials,
    fileInputRef,
    onFileChange: handleFileChange,
    onRemove: handleRemove,
    onSubmit,
  };

  const cancelButton = (
    <Button
      variant="ghost"
      onClick={() => handleOpenChange(false)}
      className="shrink-0 mt-0.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-150"
    >
      Cancel
    </Button>
  );

  const submitButton = (
    <Button
      type="submit"
      form="profile-form"
      disabled={isPending || (!form.formState.isDirty && !selectedFile)}
      className="w-full h-12 rounded-xl font-semibold text-base"
    >
      {isPending ? "Updating..." : "Update Profile"}
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="p-0 gap-0 max-w-sm overflow-hidden rounded-2xl border-0 ring-1 ring-foreground/8 shadow-2xl"
        >
          <div className="relative px-5 pt-5 pb-4 border-b border-border">
            <div className="contact-dialog-glow pointer-events-none absolute inset-0" />
            <DialogHeader className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="font-display text-[1.15rem] font-bold tracking-tight leading-tight">
                    Your profile
                  </DialogTitle>
                  <DialogDescription className="mt-0.5 text-[12.5px] leading-snug">
                    How others see you on Sphere
                  </DialogDescription>
                </div>
                {cancelButton}
              </div>
            </DialogHeader>
          </div>

          <ProfileFormBody {...sharedFormProps} />
          <div className="px-5 pb-5">{submitButton}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[96dvh]">
        <div className="relative border-b border-border">
          <div className="contact-dialog-glow pointer-events-none absolute inset-0" />
          <DrawerHeader className="relative flex-row items-start justify-between gap-4 px-5 pt-4 pb-4">
            <div>
              <DrawerTitle className="font-display text-[1.15rem] font-bold tracking-tight leading-tight text-left">
                Your profile
              </DrawerTitle>
              <DrawerDescription className="mt-0.5 text-[12.5px] leading-snug text-left">
                How others see you on Sphere
              </DrawerDescription>
            </div>
            {cancelButton}
          </DrawerHeader>
        </div>

        <ScrollArea className="flex-1 overflow-hidden">
          <ProfileFormBody {...sharedFormProps} />
        </ScrollArea>

        <DrawerFooter className="px-5 pt-0 pb-6">{submitButton}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDialog;
