import React from 'react';
import type { UseFormRegister, FieldErrors, UseFormHandleSubmit, FieldValues, Path, Control } from 'react-hook-form';
import { FILTERS } from '../harmix/filters';
import './PlaylistForm.css';
import { Select, Space } from 'antd';
import { Controller } from 'react-hook-form';

type PlaylistFormProps<T extends FieldValues> = {
  onSubmit: (data: T) => void;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  loading: boolean;
  isUserLoggedIn: boolean;
  control: Control<T>;
};

const PlaylistForm = <T extends FieldValues>({ onSubmit, register, handleSubmit, errors, loading, isUserLoggedIn, control }: PlaylistFormProps<T>) => {
  return (
    <div className="card">
      <h2>Generate a playlist</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="playlist-input" 
          type="text" 
          placeholder="Enter what you like" 
          {...register("searchQuery" as Path<T>, { required: "This field is required" })}
        />
        {errors["searchQuery" as keyof T] && <span className="error-message">{(errors["searchQuery" as keyof T] as any).message}</span>}
        <div className="filters-container flex justify-between gap-4">
          <div className="relative w-1/3">
            <Space style={{ width: '100%', cursor: 'pointer' }} direction="vertical">
              <Controller
                name={"selectedGenres" as Path<T>}
                control={control}
                render={({ field }) => (
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ 
                      width: '100%',
                      backgroundColor: '#a9a9a9',
                      borderRadius: '8px'
                    }}
                    dropdownStyle={{
                      backgroundColor: '#a9a9a9',
                      borderRadius: '8px'
                    }}
                    placeholder="Please select a genre"
                    options={FILTERS.genres.map(genre => ({ value: genre, label: genre }))}
                    className="custom-select"
                    tokenSeparators={[',']}
                    {...field}
                  />
                )}
              />
            </Space>
          </div>

          <div className="relative w-1/3">
            <Space style={{ width: '100%', cursor: 'pointer' }} direction="vertical">
              <Controller
                name={"selectedMoods" as Path<T>}
                control={control}
                render={({ field }) => (
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ 
                      width: '100%',
                      backgroundColor: '#a9a9a9',
                      borderRadius: '8px'
                    }}
                    dropdownStyle={{
                      backgroundColor: '#a9a9a9',
                      borderRadius: '8px'
                    }}
                    placeholder="Please select a mood"
                    options={FILTERS.moods.map(mood => ({ value: mood, label: mood }))}
                    className="custom-select"
                    tokenSeparators={[',']}
                    {...field}
                  />
                )}
              />
            </Space>
          </div>

          <div className="relative w-1/3">
            <Space style={{ width: '100%', cursor: 'pointer' }} direction="vertical">
              <Controller
                name={"selectedInstruments" as Path<T>}
                control={control}
                render={({ field }) => (
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ 
                      width: '100%',
                      backgroundColor: '#a9a9a9',
                      borderRadius: '8px'
                    }}
                    dropdownStyle={{
                      backgroundColor: '#a9a9a9',
                      borderRadius: '8px'
                    }}
                    placeholder="Please select an instrument"
                    options={FILTERS.instruments.map(instrument => ({ value: instrument, label: instrument }))}
                    className="custom-select"
                    tokenSeparators={[',']}
                    {...field}
                  />
                )}
              />
            </Space>
          </div>
        </div>
        <button type="submit" disabled={loading || !isUserLoggedIn}>Generate</button>
      </form>
    </div>
  );
};

export default PlaylistForm; 