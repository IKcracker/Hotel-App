import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Contact() {
    return ( 
        <section className="contact container row" id="contact">
            <div className="col-lg-8">
            <Link className='back' style={{color:'#ea2430'}} to={"/"}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
                <h3 className="heading">Get In <span>Touch</span></h3>
                <div className="contact-row">
                    <form action="https://formspree.io/f/mayrzday" method="post">
                        <div className="row g-3 ">
                            <div className="col-lg-6">
                                <label htmlFor="firstName" className="form-label"> First Name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="First name" aria-label="First name" name="firstName" />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="secondName" className="form-label"> Second Name</label>
                                <input type="text" className="form-control" id="secondName" placeholder="Last name" aria-label="Last name" name="secondName" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label"> Your Email</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Your Subject</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} name="message" />
                        </div>
                        <div className="btn-box">
                            <button className="btn btn-primary" type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
     );
}

export default Contact;