import profile_picture1 from '../../images/random_profile_pictures/profile_picture1.jpg';
import profile_picture2 from '../../images/random_profile_pictures/profile_picture2.jpg';
import profile_picture3 from '../../images/random_profile_pictures/profile_picture3.jpg';
import profile_picture4 from '../../images/random_profile_pictures/profile_picture4.jpg';
import profile_picture5 from '../../images/random_profile_pictures/profile_picture5.jpg';
import profile_picture6 from '../../images/random_profile_pictures/profile_picture6.jpg';
import profile_picture7 from '../../images/random_profile_pictures/profile_picture7.jpg';
import profile_picture8 from '../../images/random_profile_pictures/profile_picture8.jpg';
import './RandomProfilePictureGenerator.css';

const RandomProfilePicture = ({style, profileImage}) => {

    const getRandomProfileImage = () => {
        const randomNumber = Math.floor(Math.random() * 8);
        switch(randomNumber) {
            case 0: return profile_picture1;
            case 1: return profile_picture2;
            case 2: return profile_picture3;
            case 3: return profile_picture4;
            case 4: return profile_picture5;
            case 5: return profile_picture6;
            case 6: return profile_picture7;
            case 7: return profile_picture8;
            default: return profile_picture1;
        }
    };

    return (
        <img src={profileImage || getRandomProfileImage()} className={style} alt="Profile-picture" />
    );
}

export default RandomProfilePicture;
