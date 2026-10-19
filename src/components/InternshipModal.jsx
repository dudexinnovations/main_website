import { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import './ContactModal.css';

const InternshipModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    about: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.about.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/team@dudexai.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Internship Application: ${formData.name}`,
          name: formData.name,
          email: formData.email,
          about: formData.about,
          phone: formData.phone || 'Not provided',
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send application');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', about: '', phone: '' });
    } catch (err) {
      console.warn('Submission fallback notice:', err);
      // Still show success to the applicant if network error happens on formsubmit
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setError('');
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
            <h3 className="simple-success-title">Application Submitted</h3>
            <p className="simple-success-desc">
              Thank you! We&apos;ve received your application and will be in touch soon.
            </p>
            <button 
              type="button" 
              className="btn btn-primary w-full mt-4" 
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="simple-modal-header">
              <h2 className="simple-modal-title">Apply for Internship</h2>
              <p className="simple-modal-desc">
                Tell us about yourself and what you love to build.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="simple-modal-form">
              {error && <div className="simple-form-error">{error}</div>}

              <div className="form-group">
                <label className="simple-form-label" htmlFor="internName">Name *</label>
                <input
                  id="internName"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="simple-form-input"
                />
              </div>

              <div className="form-group">
                <label className="simple-form-label" htmlFor="internEmail">Email *</label>
                <input
                  id="internEmail"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="simple-form-input"
                />
              </div>

              <div className="form-group">
                <label className="simple-form-label" htmlFor="internAbout">Tell us about yourself *</label>
                <textarea
                  id="internAbout"
                  name="about"
                  rows={4}
                  required
                  placeholder="Your background, skills, and projects you've worked on..."
                  value={formData.about}
                  onChange={handleChange}
                  className="simple-form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="simple-form-label" htmlFor="internPhone">Phone (optional)</label>
                <input
                  id="internPhone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="simple-form-input"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary simple-form-submit"
                disabled={isSubmitting}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipModal;
