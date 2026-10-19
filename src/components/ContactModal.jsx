import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { saveLead } from '../config/presenceScore';
import './ContactModal.css';

const WHATSAPP_URL = "https://wa.me/917338869230?text=Hi%20DudeX%2C%20I%27d%20like%20to%20talk%20about%20a%20project.";

const ContactModal = ({ isOpen, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData((prev) => ({
        ...prev,
        name: initialData.name || prev.name,
        phone: initialData.phone || prev.phone,
        email: initialData.email || prev.email,
        message: initialData.notes || initialData.message || prev.message
      }));
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.phone.trim()) errs.phone = 'Please provide your phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      leadType: 'simple_contact_form',
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'Not provided',
      message: formData.message || 'No message provided',
      sourceUrl: window.location.href,
      submittedAt: new Date().toISOString()
    };

    // Save lead locally / tracking
    await saveLead(payload);

    try {
      await fetch('https://formsubmit.co/ajax/team@dudexai.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...payload,
          _subject: `New Project Inquiry: ${formData.name}`,
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.warn('FormSubmit dispatch fallback:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setErrors({});
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 250);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content-luxury simple-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn" 
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="simple-modal-success text-center">
            <div className="success-icon-wrap">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="simple-success-title">Message Sent</h3>
            <p className="simple-success-desc">
              Thank you, {formData.name}. We&apos;ll get back to you shortly.
            </p>
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn btn-primary w-full mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="simple-modal-header">
              <h2 className="simple-modal-title">Let&apos;s talk</h2>
              <p className="simple-modal-desc">
                Tell us about your project or reach us directly on WhatsApp.
              </p>
            </div>

            {/* Bronze Styled WhatsApp Quick Button */}
            <div className="modal-whatsapp-wrap">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-bronze"
                id="modal-whatsapp-btn"
              >
                <MessageCircle size={18} className="whatsapp-icon-bronze" />
                <span>Message us on WhatsApp</span>
              </a>
            </div>

            <div className="simple-modal-divider">
              <span className="divider-line" />
              <span className="divider-text">or send a message</span>
              <span className="divider-line" />
            </div>

            {/* Simple Contact Form */}
            <form onSubmit={handleSubmit} className="simple-modal-form">
              <div className="form-group">
                <label className="simple-form-label" htmlFor="contactName">Name *</label>
                <input
                  id="contactName"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className={`simple-form-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="simple-error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="simple-form-label" htmlFor="contactPhone">Phone *</label>
                <input
                  id="contactPhone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className={`simple-form-input ${errors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="simple-error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="simple-form-label" htmlFor="contactEmail">Email (optional)</label>
                <input
                  id="contactEmail"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className="simple-form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="simple-form-label" htmlFor="contactMessage">Message (optional)</label>
                <textarea
                  id="contactMessage"
                  name="message"
                  rows={3}
                  placeholder="Brief details or requirements..."
                  className="simple-form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary simple-form-submit"
                id="contact-send-btn"
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Sending...' : 'Send'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
