import { useEffect, useState } from "react";
import ProfileService from "../services/ProfileService";
import { User } from "../types/user";
import { Pet } from "../types/pet";
import { UserProfileProps } from "../types/user";
import "../styles/_profilePage.scss";

function ProfilePage({}: UserProfileProps) {
  const [userData, setUserData] = useState<User>();
  const [petData, setPetData] = useState<Pet[]>();
  useEffect(() => {
    getInfo();
  }, []);
  async function getInfo(): Promise<void> {
    try {
      const responseData = await ProfileService.getUserInfo();
      setUserData(responseData.user);
      setPetData(responseData.pets);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }
  return (
    <div className="profile-container">
      <h1>Profile page</h1>
      <h3> Welcome {userData?.firstName}!</h3>
      <div className="div-profile">
        <div className="div-user">
          <p>First name: {userData?.firstName}</p>
          <p>Last name: {userData?.lastName}</p>
          <p>E-mail: {userData?.email}</p>
          <p>Role: {userData?.role}</p>
        </div>

        {petData?.map((pet, index) => (
          <div key={index} className="div-pet">
            <p>Pet Name: {pet.name}</p>
            <p>Type: {pet.type}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
