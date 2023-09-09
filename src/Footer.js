const Footer = () => {
    let year=new Date();
    year=year.getFullYear();
    console.log(year);
    return ( 
                <div style={{margin:"20px",textAlign:"right"}} id="footer">
                  <p class="footer">©  SEE, IIT Kanpur, {year}</p>
                </div>
            );
          }
          
 
export default Footer;