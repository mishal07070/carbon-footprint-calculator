const Footer = () => {
    let year=new Date();
    year=year.getFullYear();
    console.log(year);
    return ( 
                <div style={{paddingRight:"20px", paddingTop:"60px",textAlign:"right"}} id="footer">
                  <p class="footer">©  SEE, IIT Kanpur, {year}</p>
                </div>
            );
          }
          
export default Footer;