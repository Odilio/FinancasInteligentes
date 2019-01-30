import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { getParam } from '../../utils/navHelpers';
import DeleteButton from './DeleteButton';
import {
  Input,
  Button,
  Text,
  KeyboardAvoidingView,
  Select,
  ScreenWrapper,
  HeaderTitle,
  IconsPickerModal,
  BigRoundIconButton,
} from '../../components';
import s from './styles';
import { colors, dimensions } from '../../styles';


const CategoryEditor = (props) => {
  const {
    icons,
    isValid,
    onSubmit,
    onChangeIcon,
    setName,
    icon,
    name,
    togglePicker,
    isPickerVisible,
    onSelectCategory,
    navigation,
  } = props;

  return (
    <View style={s.root}>
      <ScreenWrapper>
        <View>
          <View style={s.container}>
            <View style={s.secondContainer}>
              <BigRoundIconButton
                onPress={togglePicker}
                name={icon}
                backgroundColor={colors.white}
                tintColor={colors.greyDarker}
                size={dimensions.bigIconSize}
              />
              <Text style={s.label}>Choose Icon</Text>
            </View>

            <Input
              isValid
              placeholder="Category name"
              value={name}
              onChangeText={setName}
              containerStyle={s.root}
            />
          </View>

          {!getParam('category')(navigation) &&
            <Select
              options={['Despesa', 'Renda']}
              containerStyle={s.selectorContainer}
              style={s.selector}
              defaultValue="Escolha o tipo da transação"
              selectorsWidth={dimensions.containerWidth}
              onSelect={onSelectCategory}
              textStyle={s.selectTextStyle}
              optionHeight={dimensions.verticalIndent * 2.8}
            />
          }

        </View>
        <IconsPickerModal
          icons={icons}
          onIconPick={onChangeIcon}
          isVisible={isPickerVisible}
          hideModal={togglePicker}
          selectedIconName={icon}
        />
      </ScreenWrapper>

      <KeyboardAvoidingView withHeader>
        {isValid &&
        <Button
          borderless
          secondaryOpacity
          title="Salvar"
          onPress={onSubmit}
        />
        }
      </KeyboardAvoidingView>

    </View>
  );
};

CategoryEditor.navigationOptions = ({ navigation }) => ({
  headerTitle:
  <HeaderTitle title={getParam('category')(navigation) ? 'Editar Categoria' : 'Nova Categoria'} />,
  headerRight: <DeleteButton navigation={navigation} />,
});

CategoryEditor.propTypes = {
  name: T.string,
  onSubmit: T.func,
  isValid: T.bool,
  icon: T.string,
  icons: T.array,
  onChangeIcon: T.func,
  setName: T.func,
  togglePicker: T.func,
  isPickerVisible: T.bool,
  onSelectCategory: T.func,
  navigation: T.object,
};

export default CategoryEditor;
