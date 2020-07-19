import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const renderStatus = (i: number, step: number, navList: any[]) => {
  if (i === navList.length - 1) {
    return <Icon name="flag" size={12} style={styles.itemNumIcon} />;
  } else if (i < step) {
    return <Icon name="check" size={12} style={styles.itemNumIcon} />;
  } else if (i >= step) {
    return <Text style={styles.itemNumIcon}>{i + 1}</Text>;
  }
};

interface HeaderProps {
  step: number;
}

const Header = React.memo(({step = 0}: HeaderProps) => {
  const navList = [
    {
      label: '实名认证',
      id: 0,
    },
    {
      label: '选择服务',
      id: 1,
    },
    {
      label: '入驻成功',
      id: 2,
    },
  ];

  return (
    <View style={styles.container}>
      {navList.map((d, i) => {
        return (
          <View style={styles.stepItem} key={d.id}>
            <View style={[styles.itemNum, i <= step ? styles.itemPass : null]}>
              {renderStatus(i, step, navList)}
            </View>
            <Text>{d.label}</Text>
          </View>
        );
      })}
      <View style={styles.itemLine} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 10,
  },
  stepItem: {
    alignItems: 'center',
  },
  itemNum: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    width: 30,
    height: 30,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: '#e5e5e5',
  },
  itemPass: {
    backgroundColor: '#94be49',
    borderColor: 'rgba(148, 190, 73, 0.6)',
  },
  itemNumIcon: {
    color: '#fff',
  },
  itemLine: {
    zIndex: -1,
    position: 'absolute',
    top: '50%',
    right: 60,
    left: 60,
    marginTop: 3,
    height: 3,
    backgroundColor: '#e5e5e5',
  },
});

export default Header;
