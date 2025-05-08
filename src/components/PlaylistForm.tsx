import React from 'react';
import type { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

type FormInputs = {
  searchQuery: string;
};

type PlaylistFormProps = {
  onSubmit: (data: FormInputs) => void;
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  errors: FieldErrors<FormInputs>;
  loading: boolean;
};

const PlaylistForm: React.FC<PlaylistFormProps> = ({ onSubmit, register, handleSubmit, errors, loading }) => (
  <div className="card">
    <h2>Generate a playlist</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        className="playlist-input" 
        type="text" 
        placeholder="Enter what you like" 
        {...register("searchQuery", { required: "This field is required" })}
      />
      {errors.searchQuery && <span className="error-message">{errors.searchQuery.message}</span>}
      <button type="submit" disabled={loading}>Generate</button>
    </form>
  </div>
);

export default PlaylistForm; 