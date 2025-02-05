import * as React from 'react';
import { FieldAPI, FieldConnector } from '@contentful/field-editor-shared';

import { TextInput } from '@contentful/f36-components';

export interface UrlEditorProps {
  /**
   * is the field disabled initially
   */
  isInitiallyDisabled: boolean;

  /**
   * sdk.field
   */
  field: FieldAPI;

  children?: (props: { value: string | null | undefined }) => React.ReactNode;
}

export function UrlEditor(props: UrlEditorProps) {
  const { field } = props;

  return (
    <FieldConnector<string> field={field} isInitiallyDisabled={props.isInitiallyDisabled}>
      {({ value, errors, disabled, setValue }) => {
        return (
          <div data-test-id="url-editor">
            <TextInput
              isRequired={field.required}
              isInvalid={errors.length > 0}
              isDisabled={disabled}
              value={value || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
            />
            {typeof props.children === 'function' ? props.children({ value }) : null}
          </div>
        );
      }}
    </FieldConnector>
  );
}

UrlEditor.defaultProps = {
  isInitiallyDisabled: true,
};
