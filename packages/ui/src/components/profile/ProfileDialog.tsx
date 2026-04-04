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
import styles from "./ProfileDialog.module.css";

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
    <div className={styles.avatarSection}>
      <div
        onClick={() => fileInputRef.current?.click()}
        className={styles.avatarTrigger}
        aria-label="Change profile picture"
      >
        <Avatar className={styles.avatarImage}>
          <AvatarImage src={preview ?? avatarSrc} alt={fullName} />
          <AvatarFallback className={styles.avatarFallback}>
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Hover overlay */}
        <div className={styles.avatarOverlay}>
          <Camera className="size-5 text-white" />
        </div>

        {/* Edit badge */}
        <span className={styles.avatarBadge}>
          <Camera className="size-3 text-white" />
        </span>
      </div>

      {preview && (
        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className={styles.removeBtn}
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
      className={styles.form}
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

      <FieldGroup className={styles.nameFieldGroup}>
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
                className={styles.authInput}
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
                className={styles.authInput}
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
                className={styles.textareaInput}
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
      className={styles.cancelBtn}
    >
      Cancel
    </Button>
  );

  const submitButton = (
    <Button
      type="submit"
      form="profile-form"
      disabled={isPending || (!form.formState.isDirty && !selectedFile)}
      className={styles.submitBtn}
    >
      {isPending ? "Updating..." : "Update Profile"}
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className={styles.dialogContent}
        >
          <div className={styles.headerSection}>
            <div className="contact-dialog-glow pointer-events-none absolute inset-0" />
            <DialogHeader className="relative">
              <div className={styles.headerRow}>
                <div>
                  <DialogTitle className={styles.dialogTitle}>
                    Your profile
                  </DialogTitle>
                  <DialogDescription className={styles.dialogDescription}>
                    How others see you on Sphere
                  </DialogDescription>
                </div>
                {cancelButton}
              </div>
            </DialogHeader>
          </div>

          <ProfileFormBody {...sharedFormProps} />
          <div className={styles.submitWrapper}>{submitButton}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[96dvh]">
        <div className={styles.drawerHeaderSection}>
          <div className="contact-dialog-glow pointer-events-none absolute inset-0" />
          <DrawerHeader className={styles.drawerHeader}>
            <div>
              <DrawerTitle className={styles.drawerTitle}>
                Your profile
              </DrawerTitle>
              <DrawerDescription className={styles.drawerDescription}>
                How others see you on Sphere
              </DrawerDescription>
            </div>
            {cancelButton}
          </DrawerHeader>
        </div>

        <ScrollArea className="flex-1 overflow-hidden">
          <ProfileFormBody {...sharedFormProps} />
        </ScrollArea>

        <DrawerFooter className={styles.drawerFooter}>{submitButton}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDialog;
