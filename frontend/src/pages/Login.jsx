import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Header from '../components/header'; // Make sure the case matches your file name
import Footer from '../components/footer'; // Adjust the path as necessary

function LoginPage() {
  const navigate = useNavigate(); // Create a navigate function using useNavigate

  // Function to handle the login button click
  const handleLogin = () => {
    // Implement your login logic here (e.g., API call)

    // If login is successful, navigate to the relevant dashboard
    // For example, navigate to the dashboard route:
    navigate('/admin-dashboard'); // Change '/dashboard' to your actual dashboard route
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
            <div className="card"> {/* Card container */}
              <div className="card-body">
                <div className="text-center">
                  <h2
                    className="lead fw-normal mb-4"
                    style={{ fontSize: '2rem' }}
                  >
                    Login
                  </h2>
                </div>

                <form>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i> {/* Font Awesome envelope icon */}
                      </span>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter email address"
                        style={{ fontSize: '1rem' }} // Adjust font size here
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i> {/* Font Awesome lock icon */}
                      </span>
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        style={{ fontSize: '1rem' }}                       
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{
                        width: '100%',
                        paddingLeft: '2.5rem',
                        paddingRight: '2.5rem',
                        fontSize: '1.25rem', // Increase font size for button
                      }}
                      onClick={handleLogin} // Call handleLogin on button click
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{' '}
                      <Link to="/signup" className="link-danger">
                        Register
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

export default LoginPage;
