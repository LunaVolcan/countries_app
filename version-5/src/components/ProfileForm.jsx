import React, { useState, useEffect } from 'react'

function ProfileForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        country: '',
        bio: '',
    })

    const [error, setError] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('https://countries-app-lfcu.onrender.com/get-user-profile')
                const data = await res.json()
                if (data && data.full_name) {
                    setFormData(data)
                    setFormSubmitted(true)
                }
            } catch (err) {
                console.error("Failed to fetch user profile", err)
            }
        }

        getUser()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.full_name || !formData.email || !formData.bio) {
            setError('Please fill out all required fields.')
            return
        }

        try {
            const res = await fetch("https://countries-app-lfcu.onrender.com/add-user-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            console.log("Saved:", data)
            setFormSubmitted(true)
        } catch (err) {
            console.error("Error saving profile:", err)
            setError("There was a problem saving your profile.")
        }
    }

    if (formSubmitted) {
        return <h2>Welcome, {formData.full_name}!</h2>
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <h2 className="form-title">My Profile</h2>
            <div className="form-group">
                <label htmlFor="full-name">Full Name</label>
                <input
                    type="text"
                    id="full-name"
                    name="full_name"
                    value={formData.full_name}
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
                    value={formData.country}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">Submit</button>
        </form>
    )
}

export default ProfileForm