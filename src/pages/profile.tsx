import { useState, useRef } from "react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Loader, Mail, Pencil, Save, X } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { useUpdateUser } from "@/lib/graphql";
import { uploadProfilePicture } from "@/lib/profile-picture";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, setUser ,updateUser:updateU} = useAuth();
  const { updateUser, loading } = useUpdateUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    // campus: "",
    // skill: "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    try {
      // let avatarUrl: string | null = null;

      // Upload avatar to server if a new file was selected
      if (avatarFile) {
        setUploadingAvatar(true);
        try {
          console.log(avatarFile)
 let url = await uploadProfilePicture(avatarFile);
 updateU({avatar:url})
 setAvatarFile(null)
        } catch (error) {
          console.error("Error uploading avatar:", error);
          toast.error("Failed to upload avatar. Please try again.");
          setUploadingAvatar(false);
          return;
        } finally {
          setUploadingAvatar(false);
        }
      }

    
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleSave = async () => {
    try {
     
setUploading(true)
      const result = await updateUser({
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        username: formData.username || null,
        phoneNumber: formData.phoneNumber || null,
        avatar: user?.avatar  || null,
      });

      if (result.data?.updateUser) {
        // Update local user state
        const updatedUser = { ...user, ...result.data.updateUser };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Clear the avatar file after successful upload
        setAvatarFile(null);
      }
    } catch (error:any) {
      toast.error(error?.message||"Error updating profile:")
      console.error("Error updating profile:", error);
    }finally{
      setUploading(false)
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMonths = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    if (diffInMonths < 1) return "Recently";
    if (diffInMonths === 1) return "1 month ago";
    return `${diffInMonths} months ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="bg-gray-50 dark:bg-gray-900/50 shadow-sm">
        <CardBody className="p-6 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              {/* Avatar with edit button */}
              <div className="relative">
                <Avatar
                onClick={(e)=>{
                  if(avatarFile){
handleAvatarClick()
                  }
                }}
                  className="w-24 h-24 text-large"
                  src={
                    avatarPreview ||
                    "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  }
                />
               {avatarFile? 
               <>
               {
                uploadingAvatar?    
                
                 <button
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">

                    <Loader className="w-12 h-12 animate-spin text-white" />
                  </button>
                :<>
                
                
               <button
                  className="absolute top-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                  onClick={()=>{
                    setAvatarFile(null);setAvatarPreview(user?.avatar??null)
                  }}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                  <button
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                  onClick={handleUploadAvatar}
                >
                  <Save className="w-4 h-4 text-white" />
                </button>
                </>
               }
               </>
                
                :
               <button
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                  onClick={handleAvatarClick}
                >
                  <Pencil className="w-4 h-4 text-white" />
                </button> 
                }
              
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome,
                </p>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user?.username || "User"}
                </h2>
              </div>
            </div>

            <Button
              className="bg-primary/80 text-white font-semibold px-8"
              isLoading={uploading || loading}
              disabled={loading || uploadingAvatar || uploading}
              radius="full"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                placeholder="Enter your first name"
                radius="lg"
                size="lg"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                placeholder="Enter your last name"
                radius="lg"
                size="lg"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your email
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                isReadOnly
                placeholder="your@email.com"
                radius="lg"
                size="lg"
                value={user?.email || ""}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                placeholder="Enter your username"
                radius="lg"
                size="lg"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campus
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                placeholder="Enter your campus"
                radius="lg"
                size="lg"
                value={formData.campus}
                onChange={(e) => handleInputChange("campus", e.target.value)}
              />
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skill
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                placeholder="e.g. Software Designer"
                radius="lg"
                size="lg"
                value={formData.skill}
                onChange={(e) => handleInputChange("skill", e.target.value)}
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                }}
                placeholder="+234 9047810207"
                radius="lg"
                size="lg"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>
          </div>

          {/* Email Address Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              My email Address
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.email || "No email set"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
