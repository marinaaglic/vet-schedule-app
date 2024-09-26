import { useEffect, useState } from "react";
import ProfileService from "../services/ProfileService";
import { User } from "../types/user";
import { Pet } from "../types/pet";
import "../styles/_profilePage.scss";
import Modal from "../components/reusable/Modal";
import Input from "../components/reusable/Input"; // assuming you have a reusable Input component
import AuthService from "../services/AuthService"; // service for API calls

function ProfilePage() {
  const [userData, setUserData] = useState<User>();
  const [petData, setPetData] = useState<Pet[]>([]);
  const [showAddPetModal, setShowAddPetModal] = useState<boolean>(false);
  const [newPet, setNewPet] = useState<Pet>({
    name: "",
    type: "",
    breed: "",
    age: 0,
    owner: userData?._id || "",
  });

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo(): Promise<void> {
    try {
      const responseData = await ProfileService.getUserInfo();
      setUserData(responseData.user);
      setPetData(responseData.pets);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pet
  ) {
    setNewPet((prevPet) => ({
      ...prevPet,
      [field]: e.target.value,
    }));
  }

  async function handleAddPet() {
    if (!newPet.name || !newPet.type || !newPet.breed || newPet.age <= 0) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      if (userData?._id) {
        await AuthService.registerPet(userData._id, [newPet]);
      } else {
        console.error("User ID is undefined. Cannot register pet.");
      }
      await getInfo();
      setShowAddPetModal(false);
      setNewPet({ name: "", type: "", breed: "", age: 0, owner: "" });
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  }

  return (
    <div className="profile-container">
      <Modal
        title="Pet Registration Form"
        open={showAddPetModal}
        onClose={() => setShowAddPetModal(false)}
        onAction={handleAddPet}
        buttonText="Add"
      >
        <Input
          type="text"
          label="Pet's Name"
          id="pet-name"
          value={newPet.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <Input
          type="text"
          label="Type"
          id="pet-type"
          value={newPet.type}
          onChange={(e) => handleChange(e, "type")}
        />
        <Input
          type="text"
          label="Breed"
          id="pet-breed"
          value={newPet.breed}
          onChange={(e) => handleChange(e, "breed")}
        />
        <Input
          type="number"
          label="Age"
          id="pet-age"
          value={newPet.age}
          onChange={(e) => handleChange(e, "age")}
        />
      </Modal>

      <h2>Welcome {userData?.firstName}!</h2>
      <div className="div-profile">
        <div className="div-user">
          <p>First name: {userData?.firstName}</p>
          <p>Last name: {userData?.lastName}</p>
          <p>Email: {userData?.email}</p>
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
        onClick={() => setShowAddPetModal(true)}
      >
        Add another pet
      </button>
    </div>
  );
}

export default ProfilePage;
