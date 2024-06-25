import { GetToKnow } from "./GetToKnow/GetToKnow";
import { PictureCard } from "./PictureCard/PictureCard";
import { Challenges } from "./Challenges/Challenges";
import "./left-column-styles.css";


export const LeftColumn = ({ profile }) => {

    return (
        <div className="left-column">
            <div className="profile-and-challenge">
                <PictureCard profile={profile}/>
                <Challenges profile={profile} />
            </div>
            <div className="get-to-know">
                <GetToKnow profile={profile} />
            </div>
        </div>
        )
    }