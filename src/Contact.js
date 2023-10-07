import Rajeev from "./images/rajeev-jindal.jpg"
import Ashish from "./images/ashish-garg.jpg"
import Card from '@mui/joy/Card';
import { motion } from 'framer-motion';

const Contact = () => {
    return (  
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}  className="contactUs">
            <h1 style={{width:'100%',textAlign:'center'}}><b>CONTACT US</b></h1>
            <Card sx={{ width: 320, maxWidth:'100%' }}>
                <img style={{borderRadius:"100%"}}src={Ashish} alt="ashish-garg"></img>
                <h2 style={{textAlign:"center"}}>Dr. Ashish Garg</h2>

                <p className="cardP"><b>Center Coordinator</b><br></br><b>Research Interests</b>:  Solar photovoltaics, Energy Harvesting, Energy Policy</p>
                <p className="cardP">Email : <a href="mailto:ashishg@iitk.ac.in">ashishg@iitk.ac.in</a></p>
            </Card>
            <Card sx={{ width: 320, maxWidth:'100%' }}>
                <img style={{borderRadius:"100%"}}src={Rajeev} alt="rajeev_jindal"></img>
                <h2 style={{textAlign:"center"}}>Dr. Rajeev Jindal</h2>
                <p className="cardP"><b>Research Interests</b>: Energy Technology and Policy, Carbon neutrality, c-Si Solar Cells and metal-ion batteries</p>
                <p className="cardP">Email : <a href="mailto:rajeevj@iitk.ac.in">rajeevj@iitk.ac.in</a></p>
            </Card>
        </motion.div>
    );
}
 
export default Contact;