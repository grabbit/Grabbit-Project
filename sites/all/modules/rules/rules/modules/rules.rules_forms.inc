<?php
// $Id: rules.rules_forms.inc,v 1.1.2.7 2009/05/15 13:03:12 fago Exp $


/**
 * @file Forms for the integration provided by rules
 *
 * @addtogroup rules
 * @{
 */

/**
 * Condition: Textual comparison configuration form
 */
function rules_condition_text_compare_form($settings = array(), &$form) {
  $form['settings']['text1']['#title'] = t('Two texts to compare');
  $form['settings']['text2']['#title'] = '';
  $form['settings']['regex'] = array(
    '#type' => 'checkbox',
    '#title' => t('Evaluate the second text as a regular expression.'),
    '#default_value' => isset($settings['regex']) ? $settings['regex'] : 0,
  );
}

/**
 * Condition: Numerical comparision configuration form
 */
function rules_condition_number_compare_form($settings = array(), &$form) {
  $form['settings']['number1']['#weight'] = -2;
  $form['settings']['number2']['#weight'] = 2;

  $form['settings']['operation'] = array(
    '#type' => 'select',
    '#title' => t('Operation'),
    '#options' => array('greater' => t('Greater than'), 'equal' => t('Equal to'), 'less' => t('Less than')),
    '#default_value' => isset($settings['operation']) ? $settings['operation'] : 'equal',
  );
}

function rules_condition_check_boolean_help() {
  return t('Check a <a href="http://en.wikipedia.org/wiki/Logical_value">truth value</a>, i.e. TRUE or FALSE.');
}

function rules_action_save_variable_form($settings, &$form, $form_state) {
  // Only add this form for the save variable action, not for the add variable action.
  if (!isset($form_state['element']['#info']['new variables'])) {
    $settings += array('immediate' => 0);
    $form['settings']['immediate'] = array(
      '#type' => 'checkbox',
      '#title' => t('Force immediate saving.'),
      '#description' => t('If enabled, intelligent saving is bypassed to ensure immediate saving.'),
      '#default_value' => $settings['immediate'],
    );
  }
}

function rules_action_save_variable_help() {
  return t('Usually you need not care about saving changes done by actions. However this action allows you to force saving changes, if no action does.') .' '. t('Furthermore note that changes are saved intelligently, which means that changes are saved only once, even if multiple actions request saving changes.');
}

/**
 * The following functions help converting actions
 * when upgrading from workflow-ng
 */
function workflow_ng_condition_token_compare_upgrade(&$element) {
  $element['#name'] = 'rules_condition_text_compare';
}

function workflow_ng_condition_token_numeric_upgrade(&$element) {
  $element['#name'] = 'rules_condition_number_compare';
  foreach (array('text1', 'text2', 'text1_args', 'text2_args') as $key) {
    $element['#settings'][str_replace('text', 'number', $key)] = $element['#settings'][$key];
    unset($element['#settings'][$key]);
  }
}

/**
 * @}
 */
