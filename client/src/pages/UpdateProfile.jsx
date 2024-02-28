import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userProvider';
import Navbar from '../components/sticky/Navbar';
import Footer from '../components/sticky/Footer';

const ProfilePage = () => {
  const { user, updateName, updateProfileImage } = useContext(UserContext); 
  const [name, setName] = useState(user.name || '');
  const [selectedFile, setSelectedFile] = useState(null);

  const { theme } = user || {};
  const className = theme ? `${theme}-theme` : '';

  useEffect(() => {
    setName(user.name || ''); 
  }, [user]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateName = async () => {
    try {
      await updateName(user._id, name);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleUpdatePhoto = async () => {
    try {
      await updateProfileImage(user._id, selectedFile);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  return (
    <div className={`${className} lg:mx-[150px] flex flex-col min-h-screen`}>
      <Navbar />
      <div className={`${className} limes-main flex-grow flex flex-col justify-center items-center`}>
        <div className={`${className} limes border-1 border rounded-lg p-10 shadow-md`}>
            <h1 className="text-[42px]">Profile</h1>
            <h2>Name: {user.name}</h2>
            <h3>Email: {user.email}</h3>
            <img src={user.photo} alt="Profile" className="w-[100px] h-[100px] mt-4 mb-4"/>
            <div>
                <input type="text" value={name} onChange={handleNameChange} placeholder="Enter new name" className="rounded-lg p-2 focus:outline-none outline-none mr-4" />
                <button onClick={handleUpdateName}>Update Name</button>
            </div>
            <div>
                <input type="file" onChange={handlePhotoChange} accept="image/*" className="rounded-lg focus:outline-none outline-none mr-4 mt-4 file:border-none file:bg-green-200 file:text-green-700 p-2 mb-4 border-2 border-green-500 file:rounded-md file:p-2"/>
                <button onClick={handleUpdatePhoto}>Update Photo</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;

