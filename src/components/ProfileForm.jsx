import React, { useState, useEffect } from 'react'
import { getDatabase, ref, set, get } from 'firebase/database'

function ProfileForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: '',
    });

    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false)
    const db = getDatabase() // Get database instance

    useEffect(() => {
        // Fetch user data from Firebase if it exists
        const fetchProfileData = async () => {
            const profileRef = ref(db, 'users/profileData')
            try {
                const snapshot = await get(profileRef)
                if (snapshot.exists()) {
                    setFormData(snapshot.val())
                    setFormSubmitted(true)
                }
            } catch (error) {
                console.error("Error fetching profile data:", error)
            }
        }

        fetchProfileData();
    }, [db]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.fullName || !formData.email || !formData.bio) {
            setError('Please fill out all required fields.')
            return
        }

        try {
            await set(ref(db, 'users/profileData'), formData)
            setError('')
            setFormSubmitted(true)
            console.log('Form submitted:', formData)
        } catch (error) {
            console.error("Error saving profile data:", error)
            setError("Failed to save data. Please try again.")
        }
    }

    if (formSubmitted) {
        return <h2 className="welcome-message">Welcome, {formData.fullName}!</h2>
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <h2 className="form-title">My Profile</h2>
            <div className="form-group">
                <label htmlFor="full-name">Full Name</label>
                <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default ProfileForm