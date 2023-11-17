import React from 'react';

type InputFormProps = {
    label: string;
    type: any;
    value: string;
    onChange: (value: string) => void;
  };

const InputForm: React.FC<InputFormProps> = (props) =>  {
    return (
        <div className='font-montserrat my-4'>
            <p className='font-semibold text-mainBlue text-sm'>{props.label}</p>
            <input 
            type={props.type}
            className="w-full p-3 border mt-1 border-inputGray rounded-md font-montserrat h-8 focus:outline-none "
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
  }

  export default InputForm;
