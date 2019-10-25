import React, { useState, useRef, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import api from '../../services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('banner');
  const { error } = useField('banner_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    console.tron.log(response);

    const { id, url } = response.data;

    console.tron.log(id);
    console.tron.log(url);

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="" className="banner" />
        ) : (
          <div>
            <MdCameraAlt />
            <p>Selecionar imagem</p>
          </div>
        )}
        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>

      {error && <span>{error}</span>}
    </Container>
  );
}
