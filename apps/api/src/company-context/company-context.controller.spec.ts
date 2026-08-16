import 'reflect-metadata';
import { CompanyContextController } from './company-context.controller';

describe('CompanyContextController', () => {
  it('declares completeness route before collection GET', () => {
    const methodNames = Object.getOwnPropertyNames(
      CompanyContextController.prototype,
    );
    expect(methodNames.indexOf('completeness')).toBeLessThan(
      methodNames.indexOf('get'),
    );

    expect(
      Reflect.getMetadata(
        'path',
        CompanyContextController.prototype.completeness,
      ),
    ).toBe('completeness');
    expect(
      Reflect.getMetadata('path', CompanyContextController.prototype.get),
    ).toBe('/');
  });
});
