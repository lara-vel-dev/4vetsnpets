import { Link } from "react-router-dom";
import PetList from "../components/PetList";
import { UserAuth } from "../context/AuthContext";

function Pets() {
  const { user } = UserAuth();
  return (
    <div className="vet-container">
      <h1>Pets!</h1>
      <br />
      <Link to={"/4vetsnpets/add-pet"} className="vet-btn" style={user.rol === "user" ? { display: "none" } : {}}>Add</Link >
      <div className="vet-cards">
        <PetList />
      </div>
    </div>
  );
}

export default Pets;
