import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addCustomPost } from '../store/postSlice';

const CustomAddPost: React.FC = () => {
  // const dispatch = useCustomAppDispatch();
  const [customTitle, setCustomTitle] = useState('');
  const [customCompleted, setCustomCompleted] = useState(false);
  const [customUserId, setCustomUserId] = useState(1);

  const onCustomTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setCustomTitle(e.target.value);
  const onCustomCompletedChanged = (e: React.ChangeEvent<HTMLInputElement>) => setCustomCompleted(e.target.checked);

  const onSaveCustomPostClicked = () => {
    if (customTitle) {
      // dispatch(addCustomPost({ title: customTitle, userId: customUserId, completed: customCompleted }));
      setCustomTitle('');
      setCustomCompleted(false);
    }
  };

  return (
    <div>Hello World </div>
  );
};

export default CustomAddPost;
