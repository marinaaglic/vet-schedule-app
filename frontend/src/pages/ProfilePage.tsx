import { useEffect, useState } from "react";
import ProfileService from "../services/ProfileService";
import { User } from "../types/user";
import { Pet } from "../types/pet";
import "../styles/_profilePage.scss";
import Modal from "../components/reusable/Modal";

function ProfilePage() {
  const [userData, setUserData] = useState<User>();
  const [petData, setPetData] = useState<Pet[]>();
  const [showAddPetModal, setShowAddPetModal] = useState<boolean>(false);
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

  function addPetHandler() {}

  return (
    <div className="profile-container">
      <Modal
        title="Add pet"
        open={showAddPetModal}
        onClose={() => setShowAddPetModal(!showAddPetModal)}
        onAction={addPetHandler}
        buttonText="Add"
        divText="Fill in the fields to add another pet!"
      />
      <h2> Welcome {userData?.firstName}!</h2>
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
      <button
        className="btn-add-another-pet"
        onClick={() => setShowAddPetModal(!showAddPetModal)}
      >
        Add another pet
      </button>
    </div>
  );
}

export default ProfilePage;
