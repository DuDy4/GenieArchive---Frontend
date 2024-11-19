import React from "react";
import useProfileCategory from "../hooks/useProfileCategory";

interface ProfileCategoryProps {
  tenant_id: string;
  uuid: string;
}

const ProfileCategory: React.FC<ProfileCategoryProps> = ({ tenant_id, uuid }) => {
  const { profileCategory, error, isLoading } = useProfileCategory(tenant_id, uuid);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching profile category: {error.message}</p>;
  }

  if (!profileCategory) {
    return <p>No profile category found for this user.</p>;
  }

  const { category, scores, description, icon } = profileCategory;

  return (
      <>

    <div className="flex flex-col w-full h-full gap-4 max-w-33">
            <h3 className="font-semibold !text-[16px] text-heading">
              Profile Type
            </h3>
        <div className="flex items-center justify-center">
            <img src={icon} alt={`${category} Icon`} className="w-24 h-24 mr-3" />
        </div>
        <div className="flex items-center justify-center">
            <h2 className="text-xl font-semibold">{category}</h2>
        </div>
      <p className="text-sm text-gray-600 mb-4 text-center">{description}</p>

    </div>
    </>
  );
};

export default ProfileCategory;
