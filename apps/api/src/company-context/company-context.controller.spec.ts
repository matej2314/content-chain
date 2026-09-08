import 'reflect-metadata';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { ROLES_KEY } from '../shared/decorators/roles.decorator';
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

  it('requires admin on PUT/PATCH and leaves GET routes session-only', () => {
    const proto = CompanyContextController.prototype;

    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, CompanyContextController),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata(ROLES_KEY, CompanyContextController),
    ).toBeUndefined();

    expect(Reflect.getMetadata(IS_PUBLIC_KEY, proto.get)).toBeUndefined();
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, proto.completeness),
    ).toBeUndefined();
    expect(Reflect.getMetadata(ROLES_KEY, proto.get)).toBeUndefined();
    expect(Reflect.getMetadata(ROLES_KEY, proto.completeness)).toBeUndefined();

    expect(Reflect.getMetadata(ROLES_KEY, proto.put)).toEqual(['admin']);
    expect(Reflect.getMetadata(ROLES_KEY, proto.patch)).toEqual(['admin']);
    expect(Reflect.getMetadata('path', proto.put)).toBe('/');
    expect(Reflect.getMetadata('path', proto.patch)).toBe('/');
  });
});
