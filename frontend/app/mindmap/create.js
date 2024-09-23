import React, { useState } from 'react';
import { useRouter } from 'next/router';
import mindmapService from '../services/mindmapService';

const CreateMindMap = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mindmapService.createMindMap({ title });
    router.push('/');
  };

  return (
    <div>
      <h2>Create New Mind Map</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mind Map Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateMindMap;
