import { baseClient } from "@/lib/http";
import type { ApiResponse, User } from "@sphere/shared";
import { API_ROUTES } from "@/utils/constant";

export interface ISearchContactsPayload {
  searchTerm: string;
}

export interface ISearchContactsSuccessResponse {
  contact: User[];
}

export async function searchContacts(
  payload: ISearchContactsPayload,
  signal?: AbortSignal,
) {
  const { data } = await baseClient.post<
    ApiResponse<ISearchContactsSuccessResponse>
  >(API_ROUTES.contacts.searchContact, payload, { signal });

  return data.data;
}
