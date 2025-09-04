import logo from '../assets/logo-removebg-preview.png'

const ApplyHeader = () => {
  return (
    <div>

        <img src={logo} alt="" className='w-[300px] m-auto' />
        <hr />

        <h2 className='p-4 text-center'>Employment Eligibility Verification</h2>

        <p className='p-4  text-center'>Your information is secured with aes-256 encryption and remains confidential. it is used solely for identity verification in recruitment.</p>
        <p className='text-sm text-center'><em>Reference: Form 1-9, Employment Eligibility Verification</em></p>

    </div>
  )
}

export default ApplyHeader
