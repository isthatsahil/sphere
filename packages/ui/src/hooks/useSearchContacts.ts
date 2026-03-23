import { searchContacts } from "@/lib/api/contacts.api";
import { useQuery } from "@tanstack/react-query";

export function useSearchContacts(searchTerm: string) {
  return useQuery({
    queryKey: ["contacts", "search", searchTerm],
    queryFn: ({ signal }) => searchContacts({ searchTerm }, signal),
    enabled: searchTerm.trim().length > 0,
  });
}
