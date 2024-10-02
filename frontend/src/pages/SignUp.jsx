import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import Header from '../components/header'; // Make sure the case matches your file name
import Footer from '../components/footer'; // Adjust the path as necessary

function SignUp() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignUpClick = () => {
    // You can include any sign-up logic here before navigating
    // For now, it just navigates to the login page
    navigate('/'); // Navigate to the login page
  };

  return (
    <section className="vh-100">
      {/* Header Section */}
      <Header />

      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="card" style={{ minHeight: '400px' }}>
              <div className="card-body">
                <div className="text-center">
                  <h2 className="lead fw-normal mb-4" style={{ fontSize: '2rem' }}>
                    Sign Up
                  </h2>
                </div>

                <form>
                  {/* Name and Phone input in one line */}
                  <div className="row mb-2">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="formName">
                          Name
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            id="formName"
                            className="form-control form-control-lg"
                            placeholder="Full name"
                            style={{ fontSize: '1rem' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="formPhone">
                          Phone
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-phone"></i>
                          </span>
                          <input
                            type="tel"
                            id="formPhone"
                            className="form-control form-control-lg"
                            placeholder="Phone number"
                            style={{ fontSize: '1rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="formEmail">
                      Email address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        id="formEmail"
                        className="form-control form-control-lg"
                        placeholder="Email address"
                        style={{ fontSize: '1rem' }}
                      />
                    </div>
                  </div>

                  {/* Password and Confirm Password input in one line */}
                  <div className="row mb-2">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="formPassword">
                          Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type="password"
                            id="formPassword"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            style={{ fontSize: '1rem' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="formConfirmPassword">
                          Confirm Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type="password"
                            id="formConfirmPassword"
                            className="form-control form-control-lg"
                            placeholder="Confirm password"
                            style={{ fontSize: '1rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleSignUpClick} // Add onClick handler
                      style={{
                        width: '100%',
                        paddingLeft: '2.5rem',
                        paddingRight: '2.5rem',
                        fontSize: '1.25rem',
                      }}
                    >
                      Sign Up
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account?{' '}
                      <Link to="/" className="link-danger">
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </section>
  );
}

export default SignUp;
