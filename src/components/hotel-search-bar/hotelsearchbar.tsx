import CheckInAndOut from "./checkinout";
import GoButton from "./gobutton";
import LocationForm from "./locationsearch";
import GuestForm from "./numberguests";

export default function HotelSearchBar() {
    return (
        <>
            <div className="flex space-x-2">
                <LocationForm/>
                <CheckInAndOut/>
                <GuestForm/>
                <GoButton/>
            </div>
        </>
    );
}