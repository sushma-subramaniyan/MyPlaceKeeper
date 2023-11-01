import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../components/Instructions.css"
import { useState , useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const steps = [
  {
    label: 'To Add Pin',
    description: `If you want to add your PIN for the place in the app, double-click.`,
  },
  {
    label: 'To Delete or Update',
    description:
      'To delete or update, click on the pin you have created, and you can edit or delete it.',
  },
  {
    label: 'View other user pins',
    description: `You can see other users' pins in the app, but you are not allowed to modify them..`,
  },
];

const VerticalLinearStepper = ({ setShowComponent }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useContext(AuthContext)


  const handleNext = () => {
    if(activeStep === 2){
      user ? setShowComponent({instruction:false}) : setShowComponent({instruction:false, login:true})
      setActiveStep(0)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='container'>
      <Box sx={{ maxWidth: 400 }} >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel

                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div >
                    <Button
                      style={{ 'backgroundColor': ' rgb(84, 206, 206)' }}
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    {index !== 0 && <Button
                      style={{ 'color': ' rgb(84, 206, 206)' }}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>}
                  </div>
                </Box>

              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}
export default VerticalLinearStepper
