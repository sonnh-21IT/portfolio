import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "about": "About",
            "experience": "Experience",
            "projects": "Projects",
            "contact": "Contact",
            "technologies": "What I Work With:",
            "certifications": "What I got:",
            "showLess": "show less",
            "showMore": "show more",
            "whereIWorkedTitle": "Where I’ve Worked",
            "present": "Present",
            "someThingsIBuilt": "Some Things I’ve Built",
            "featuredProject": "Featured Project",
            "certificate": "Certificate:"
        }
    },
    vi: {
        translation: {
            "about": "Giới thiệu",
            "experience": "Kinh nghiệm",
            "projects": "Dự án",
            "contact": "Liên hệ",
            "technologies": "Những thứ tôi sử dụng:",
            "certifications": "Những thứ tôi nhận được:",
            "showLess": "ẩn đi",
            "showMore": "xem thêm",
            "whereIWorkedTitle": "Nơi tôi đã làm việc",
            "present": "Hiện tại",
            "someThingsIBuilt": "Một số thứ tôi đã xây dựng",
            "featuredProject": "Nổi bật",
            "certificate": "Chứng chỉ:"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;