import React, { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile } from '../services/api';

function ProfileForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: '',
    });

    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch existing user profile on mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getUserProfile();
                if (data?.fullName) {
                    setFormData(data);
                    setFormSubmitted(true);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Failed to load profile data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.fullName || !formData.email || !formData.bio) {
            setError('Please fill out all required fields.');
            setIsLoading(false);
            return;
        }

        try {
            await saveUserProfile(formData);
            setError('');
            setFormSubmitted(true);
        } catch (error) {
            console.error("Error submitting profile:", error);
            setError("Failed to submit profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (formSubmitted) {
        return <h2 className="welcome-message">Welcome, {formData.fullName}!</h2>;
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <h2 className="form-title">My Profile</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label htmlFor="full-name">Full Name *</label>
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
                <label htmlFor="email">Email *</label>
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
                <label htmlFor="bio">Bio *</label>
                <textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                />
            </div>

            <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
            >
                {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
        </form>
    );
}

export default ProfileForm;