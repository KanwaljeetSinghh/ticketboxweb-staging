import React from 'react'
import Modal from './Modal';
import styles from './css/modal.module.css'
export default function NotVerifiedModal(props) {
  return (
    <Modal  modalClass="modal-sign" cross="yes" handler={props.handler}>
        <h4 className='text-secondary text-center f-400'>
            Your email is not <span className='text-primary f-700'>verified yet.</span>
        </h4>
        <h5 className='text-grey f-400'>Firstly verify your email and then login....</h5>
    </Modal>
  )
}
