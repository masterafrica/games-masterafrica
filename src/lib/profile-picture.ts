import { BASE_API_URL } from "@/config/site";
import Cookies from "js-cookie";

export const uploadProfilePicture = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("photo", file);

  const token = Cookies.get("accessToken");

  const uploadUrl = `${BASE_API_URL}/files/upload-profile-picture`;

  const headers: HeadersInit = {
    // "Content-Type":"Application/json"
  };
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
      errorData.message ||
      `Upload failed: ${response.statusText}`
    );
  }

  const json = await response.json();
  const avatarUrl = json?.data?.avatar;

  if (!avatarUrl || typeof avatarUrl !== "string") {
    throw new Error("Upload succeeded but no avatar URL was returned");
  }

  return avatarUrl;
};

