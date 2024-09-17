import React from "react";
import telegramIcon from "../../images/telegramIcon.png"
import VkIcon from "../../images/VkIcon.png"
import GmailIcon from "../../images/GmailIcon.png"
import YoutubeIcon from "../../images/YoutubeIcon.png"

const Footer = () => {

    return (
        <div className="footer_container">
            <div className="footer_text">
                <p className="footer_text_about">
                    © ShopWave 2024.<br/>Проект создан для обучения технологиям React и Redux.
                </p>
            </div>
            <div className="footer_buttons">
                <button className="footer_buttons_item">
                    <a href="https://t.me/ElusiveJoe60">
                        <img
                            className="footer_buttons_item_img"
                            src={telegramIcon}
                            alt="Перейти в телеграм"
                        />
                    </a>
                </button>
                <button className="footer_buttons_item">
                    <a href="https://vk.com/elusivejoe60">
                        <img
                            className="footer_buttons_item_img"
                            src={VkIcon}
                            alt="Перейти в вк"
                        />
                    </a>
                </button>
                <button className="footer_buttons_item">
                    <a href="mailto:marbtop@gmail.com">
                        <img
                            className="footer_buttons_item_img"
                            src={GmailIcon}
                            alt="Перейти на почту"
                        />
                    </a>
                </button>
                <button className="footer_buttons_item">
                    <a href="https://www.youtube.com/@justmarb6979">
                        <img
                            className="footer_buttons_item_img"
                            src={YoutubeIcon}
                            alt="Перейти на ютуб"
                        />
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Footer