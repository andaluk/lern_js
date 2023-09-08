import React from "react";
import {pMail} from '../const';
import "./input.scss"

export const MailInput = () => (
    <input type="email" placeholder={pMail} />
  );