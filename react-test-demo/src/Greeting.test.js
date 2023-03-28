import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';


describe('Greeting', () => {
  it('matches the snapshot when a name is passed', () => {
      var component = render( <Greeting name='Mike'/>
      );
      expect(component).toMatchSnapshot();
  });

  it('matches the snapshot when no name is passed', () => {
      var component = render(
          <Greeting />
      );
      expect(component).toMatchSnapshot();
  });
});