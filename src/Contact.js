import Rajeev from "./images/rajeev-jindal.jpg"
import Ashish from "./images/ashish-garg.jpg"
import Card from '@mui/joy/Card';
import { motion } from 'framer-motion';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contact = () => {
    return (  
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}  className="contactUs">
            <h1 style={{width:'100%',textAlign:'center'}}><b>CONTACT</b></h1>
            <Card sx={{ width: 320, maxWidth:'100%' }}>
                <img style={{borderRadius:"100%"}}src={Ashish} alt="ashish-garg"></img>
                <h2 style={{textAlign:"center"}}>Dr. Ashish Garg</h2>

                <p className="cardP"><b>Center Coordinator</b><br></br><b>Research Interests</b>:  Solar photovoltaics, Energy Harvesting, Energy Policy</p>
                <div className="links">
                    <a className="link" href="mailto:ashishg@iitk.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
                    <a className="link" href="https://www.linkedin.com/in/ashgarg/?originalSubdomain=in"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
            </Card>
            <Card sx={{ width: 320, maxWidth:'100%' }}>
                <img style={{borderRadius:"100%"}}src={Rajeev} alt="rajeev_jindal"></img>
                <h2 style={{textAlign:"center"}}>Dr. Rajeev Jindal</h2>
                <p className="cardP"><b>Research Interests</b>: Energy Technology and Policy, Carbon neutrality, c-Si Solar Cells and metal-ion batteries</p>
                <div className="links">
                    <a className="link" href="mailto:rajeevj@iitk.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
                    <a className="link" href="https://www.linkedin.com/in/rajeevjindal/?originalSubdomain=in"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
            </Card>
        </motion.div>
    );
}
 
export default Contact;