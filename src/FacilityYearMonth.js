import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';

function handleChange(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
};

function handleInput(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
};


const FacilityYearMonth = (data) => {
    return (
        <form className="calcForm">
            <div className='inputs'>
                <h3>Facility<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select className="Select" value={data.lastInstance.facilityName ? data.lastInstance.facilityName : null} placeholder="Choose Facility" onChange={(event, value) => { handleChange(data.array, data.setArray, value, data.array.length - 1, 'facilityName') }}>
                    <Option value="Academic Area">Academic Area</Option>
                    <Option value="Halls of Residence">Halls of Residence</Option>
                    <Option value="Housing Areas">Housing Areas</Option>
                    <Option value="Others">Others</Option>
                </Select>
            </div>
            <div className='inputs'>
                <h3>Year<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Input type="number" value={data.lastInstance.year ? data.lastInstance.year : ''} onChange={(event) => { handleInput(data.array, data.setArray, event.target.value, data.array.length - 1, 'year') }} className="Select" placeholder='Enter Year' />
            </div>
            <div className="inputs">
                <h3>Month<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select value={data.lastInstance.month ? data.lastInstance.month : null} className="Select" id="monthSelect" placeholder="Choose Month" onChange={(event, value) => { handleChange(data.array, data.setArray, value, data.array.length - 1, 'month') }}>
                    <Option value="January">January</Option>
                    <Option value="February">February</Option>
                    <Option value="March">March</Option>
                    <Option value="April">April</Option>
                    <Option value="May">May</Option>
                    <Option value="June">June</Option>
                    <Option value="July">July</Option>
                    <Option value="August">August</Option>
                    <Option value="September">September</Option>
                    <Option value="October">October</Option>
                    <Option value="November">November</Option>
                    <Option value="December">December</Option>
                </Select>
            </div>
        </form>
    );
}
export default FacilityYearMonth;