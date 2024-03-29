import { useNavigate } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

// import hooks
import useNurseryContext from "../../hooks/useNurseryContext";
import useNurseryLogout from "../../hooks/useNurseryLogout";
import useFetchBooking from "../../hooks/useFetchBooking";
// import css and icons
import "./styles/NurseryMainPage.css";
import childrenIcone from "../../assets/enfants.png";
import parentsIcone from "../../assets/parents.png";
import bookingIcone from "../../assets/reservation.png";

function NurseryMainPage() {
  const { nurseryContext } = useNurseryContext();
  const { booking } = useFetchBooking();
  const navigate = useNavigate();
  const { logout } = useNurseryLogout();

  const handleLogout = () => {
    logout();
    navigate("/nurserylogin");
  };

  return (
    <div className="nurseryPage">
      <header className="accountHeader">
        <h3>{nurseryContext.name} </h3>
        <div className="nurseryLogout">
          <button
            type="button"
            onClick={handleLogout}
            className="btnNurseryogout"
          >
            <ArrowRightEndOnRectangleIcon width={20} />
            Me déconnecter
          </button>
        </div>
      </header>
      <div className="buttonFilterContainer">
        <button type="button">Toutes les réservations</button>
        <button type="button">Trier par jour</button>
        <button type="button">Trier par semaine</button>
        <button type="button">Trier par mois</button>
      </div>
      {booking !== null &&
        booking.map((booked) => {
          const formattedDate = new Date(
            booked.availability_id.date
          ).toLocaleDateString();
          return (
            <div className="card">
              <div className="childAndparentsIcons">
                <div className="childName">
                  <img
                    src={childrenIcone}
                    alt="icone enfants"
                    width={35}
                    height={35}
                  />
                  <p>
                    {booked.child_id.firstname} {booked.child_id.lastname}
                  </p>
                </div>
                <div className="parentsName">
                  <img
                    src={parentsIcone}
                    alt="icone parents"
                    width={35}
                    height={35}
                  />
                  <p>
                    {booked.child_id.parent_id.firstname}{" "}
                    {booked.child_id.parent_id.lastname}
                  </p>
                </div>
              </div>
              <div className="bookingIcon">
                <div className="bookingDate">
                  <img
                    src={bookingIcone}
                    alt="icone reservation"
                    width={35}
                    height={35}
                  />
                  <p>{formattedDate}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default NurseryMainPage;
