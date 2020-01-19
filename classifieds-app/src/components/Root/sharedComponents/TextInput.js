import styled from 'styled-components';

const TextIntput = styled.input`
  border: 1px solid ${props => props.theme.veryLightgrey};
  box-sizing: border-box;
  display: block;
  font-size: 0.9rem;
  padding: 0.25rem;
  width: 100%;
`;
export default TextIntput;
