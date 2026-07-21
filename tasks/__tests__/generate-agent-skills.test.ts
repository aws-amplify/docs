import { generateAgentSkillsIndex } from '../generate-agent-skills.mjs';

describe('generate-agent-skills', () => {
  describe('generateAgentSkillsIndex', () => {
    it('should return a valid index JSON document with a $schema', () => {
      const parsed = JSON.parse(
        generateAgentSkillsIndex('https://docs.amplify.aws')
      );

      expect(typeof parsed.$schema).toBe('string');
      expect(Array.isArray(parsed.skills)).toBe(true);
      expect(parsed.skills.length).toBeGreaterThan(0);
    });

    it('should include the amplify-workflow skill with required fields', () => {
      const parsed = JSON.parse(
        generateAgentSkillsIndex('https://docs.amplify.aws')
      );
      const skill = parsed.skills.find((s: any) => s.name === 'amplify-workflow');

      expect(skill).toBeDefined();
      expect(skill.type).toBeTruthy();
      expect(skill.description).toBeTruthy();
      expect(skill.url).toBe(
        'https://docs.amplify.aws/react/develop-with-ai/agent-plugins/'
      );
    });

    it('should not publish a sha256 digest for doc-pointed skills', () => {
      const parsed = JSON.parse(
        generateAgentSkillsIndex('https://docs.amplify.aws')
      );

      for (const skill of parsed.skills) {
        expect(skill.sha256).toBeUndefined();
      }
    });

    it('should honor the provided domain', () => {
      const parsed = JSON.parse(generateAgentSkillsIndex('https://example.com'));

      expect(parsed.skills[0].url.startsWith('https://example.com/')).toBe(true);
    });
  });
});
