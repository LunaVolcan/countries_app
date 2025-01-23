import React, { useState, useEffect } from 'react'

function ProfileForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: '',
    });

    const [error, setError] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('profileData'))
        const isFormSubmitted = localStorage.getItem('formSubmitted')

        if (savedData) {
            setFormData(savedData)
        }
        if (isFormSubmitted) {
            setFormSubmitted(true)
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.fullName || !formData.email || !formData.bio) {
            setError('Please fill out all required fields.');
            return
        }

        // Save form data to localStorage
        localStorage.setItem('profileData', JSON.stringify(formData))
        localStorage.setItem('formSubmitted', 'true')

        setError('');
        setFormSubmitted(true)
        console.log('Form submitted:', formData)
    }

    if (formSubmitted) {
        return <p>Thank you! Your profile has already been submitted.</p>
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
                <button type="submit" className="submit-button">Submit</button>
            </div>
        </form>
    )
}

export default ProfileForm