/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect.js';
import validate from './validate';

const { describe, it } = global;

describe('Validation', () => {
  describe('Email', () => {
    it('should return true for a valid email', () => {
      const result = validate.email('my.email@example.com');
      expect(result).to.equal(true);
    });

    it('should return false if the email does not contain an @ symbol', () => {
      const result = validate.email('my.email.example.com');
      expect(result).to.equal(false);
    });

    it('should return false if the email contains two @ symbols', () => {
      const result = validate.email('my@email@example.com');
      expect(result).to.equal(false);
    });

    it('should return false if passed an empty string', () => {
      const result = validate.email('');
      expect(result).to.equal(false);
    });

    it('should return false if not passed a string', () => {
      const result = validate.email({ myEmail: 'my.email@example.com' });
      expect(result).to.equal(false);
    });
  });

  describe('Password', () => {
    it('should return true if passed a string longer than the min length', () => {
      const result = validate.password('abc123', 2);
      expect(result).to.equal(true);
    });

    it('should return false if passed an empty string', () => {
      const result = validate.password('');
      expect(result).to.equal(false);
    });

    it('should return false if not passed a string', () => {
      const result = validate.password({ myInput: 'abc123' });
      expect(result).to.equal(false);
    });
  });

  describe('Multiple validations', () => {
    it('should accept an array of objects', () => {
      const result = validate.password([
        { email: 'email@example.com' },
        { password: 'abc123' },
      ]);
      expect(result).to.equal(false);
    });
  });
});
