import './rightbar.css'
import {Users } from '../../dummyData'
import Online from '../online/Online'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Rightbar({ user }) {
    
    
    const HomeRightbar = () => {
        return(
            <>
                <div className="birthdayContainer">
                    <img src="./assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have birthday today.
                    </span>
                </div>
                <img src="./assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = ({user}) => {
        const PF = process.env.REACT_APP_PUBLIC_FOLDER
        const [friends, setFriends] = useState([]);


        useEffect(() => {
            const getFriends = async () => {
                try {
                    const friendList = await axios.get("/users/friends/"+user._id);
                    //console.log(friendList.data);
                    setFriends(friendList.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getFriends();
        }, [user]);;
        return (
            <>
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.City}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.From}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.Relationship === 1 ? "single" : user.Relationship === 2 ? "Married":""}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                        <div className="rightbarFollowing">
                            <img src={friend.profilePicture
                                ? PF + friend.profilePicture
                                : PF + "person/noAvatar.png"}
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar user={user}/> : <HomeRightbar />}
            </div>
        </div>
    )
}
