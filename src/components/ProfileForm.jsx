function ProfileForm() {
    return (
        <form action="/submit" method="POST">
          <h2>My Profile</h2>
            <div className="text-form">
            <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" name="full_name"placeholder="Full Name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" />

            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="Country"  placeholder="Country"/>
            </div>
            <div className="input-box">
            <textarea id="bio" name="bio" rows="4" placeholder="Bio" required></textarea>
            </div>
            <div className="submitButton">
            <button type="submit">Submit</button>
            </div>
      </form>
    );
}

export default ProfileForm

